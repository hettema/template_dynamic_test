/*******************************************
 *
 * INITIAL SETUP STUFF
 *
 ********************************************/
Meteor.subscribe("wizard")

Meteor.startup(function() {
    var today = new Date()
        // set up for navigation
    Session.setDefault('homeNav', true)
    Session.setDefault("otherTemplate", false)
})



/*******************************************
 *
 * body TEMPLATE STUFF
 *
 ********************************************/

Template.body.helpers({
    navigation: function() {
        if (Session.get("homeNav")) {
            return "home"
        } else if (Session.get("otherTemplate")) {
            return "otherTemplate"
        } else {
            console.log("something went wrong with the navigation")
        }
    }
});

Template.body.events({
    'click .homeNav': function() {
        Session.set("homeNav", true)
        Session.set("todayNav", false)
    },
    'click .otherTemplate': function() {
        Session.set("homeNav", false)
        Session.set("otherTemplate", true)
    }
});

var checkStep = function(obj, stepName) {
    var stepFromObject = (obj.wizardStep === stepName)
    var stepFromSession = (Session.get("wizardStep") === stepName)
    return (stepFromObject && stepFromSession) 
}



/*******************************************
 *
 * home TEMPLATE STUFF
 *
 ********************************************/

Template.home.helpers({
    wizardTemplate: function() {
        if (checkStep(this, "home")) {
            
            return "home"
        } else if (checkStep(this, "wizardStep1")) {
    
            return "wizardStep1"
        } else if (checkStep(this, "wizardStep2")) {
            
            return "wizardStep2"
        } else {
            
            console.log(this)
            console.log("something went wrong in the wizard")
        }
    },
    wizard: function() {
        var today = new Date();
        if (Session.get("wizardStep", "home")) {
            // align the wizardStep session with the dbase
            return Wizard.findOne({
                createdBy: Meteor.userId(),
                onDay: today.setHours(0, 0, 0, 0)
            })
        } else {
            return false
        }
    }
});

Template.home.events({
    'click .yes': function(e, template) {
        e.preventDefault();
        Meteor.call('wizardStep1');
        return Session.set("wizardStep", "wizardStep1")
    },
    'click .no': function(e, template) {
        e.preventDefault();
        Meteor.call('wizardStep2');
        return Session.set("wizardStep", "wizardStep2")
    }
});