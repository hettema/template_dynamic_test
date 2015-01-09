

Meteor.publish("wizard", function() {
    return Wizard.find({
        createdBy: this.userId
    })
})
