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



/*******************************************
 *
 * home TEMPLATE STUFF
 *
 ********************************************/

Template.home.helpers({
    wizardTemplate: function() {
        var today = new Date();
        var wizardState = Wizard.findOne({createdBy: Meteor.userId(), onDay: today.setHours(0,0,0,0)})
        console.log("the wizardState inside wizardTemplate: ", wizardState)
        if (wizardState === undefined) {
            console.log("there are no entries for today in the dbase: ")
            return "wizardStart"
        } else if (wizardState.wizardStep === "wizardStep1") {
            console.log("wizardTemplate executed wizardStep1: ", this)
            return "wizardStep1"
        } else if (wizardState.wizardStep === "wizardStep2") {
            console.log("wizardTemplate executed wizardStep2: ", this)
            return "wizardStep2"
        } else {
            
            console.error(this)
            console.error("something went wrong in the wizard")
        }
    }
});

Template.home.events({
    'click .yes': function(e, template) {
        e.preventDefault();
        Meteor.call('wizardStep1');
    },
    'click .no': function(e, template) {
        e.preventDefault();
        Meteor.call('wizardStep2');
    }
});