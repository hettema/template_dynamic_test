var methods = {
    wizardStep1: function() {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        } else {
            var today = new Date();
            // update if a wizard for today exists
            if (Wizard.findOne({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                })) {
                console.log("wizard exists, updating")

                // update the wizard
                Wizard.update({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                }, {
                    $set: {
                        wizardStep: "wizardStep1"
                    }
                })
            } else {
                Wizard.insert({
                    createdBy: Meteor.userId(),
                    wizardStep: "wizardStep1",
                    createdAt: new Date(),
                    onDay: today.setHours(0, 0, 0, 0)
                })
            }
        }
    },
    wizardStep2: function() {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        } else {
            var today = new Date();
            // update if a wizard for today exists
            if (Wizard.findOne({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                })) {
                console.log("wizard exists, updating")

                // update the wizard
                Wizard.update({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                }, {
                    $set: {
                        wizardStep: "wizardStep2"
                    }
                })
            } else {
                Wizard.insert({
                    createdBy: Meteor.userId(),
                    wizardStep: "wizardStep2",
                    createdAt: new Date(),
                    onDay: today.setHours(0, 0, 0, 0)
                })
            }
        }
    },

}

Meteor.methods(methods)