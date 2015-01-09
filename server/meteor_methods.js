var methods = {
    wizardStep1: function() {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        } else {
            var today = new Date();
            var wizardState = Wizard.findOne({
                createdBy: Meteor.userId(),
                onDay: today.setHours(0, 0, 0, 0)
            })

            if (wizardState === undefined) {
                // new entry
                console.log("no wizard exists, inserting")

                Wizard.insert({
                    createdBy: Meteor.userId(),
                    wizardStep: "wizardStep1",
                    createdAt: new Date(),
                    onDay: today.setHours(0, 0, 0, 0)
                })

            } else {
                // existing entry
                console.log("Wizard exists, updating")
        
                Wizard.update({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                }, {
                    $set: {
                        wizardStep: "wizardStep1"
                    }
                })
            }
        }
    },
    wizardStep2: function() {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        } else {
            var today = new Date();
            var wizardState = Wizard.findOne({
                createdBy: Meteor.userId(),
                onDay: today.setHours(0, 0, 0, 0)
            })

            if (wizardState === undefined) {
                // no entry
                console.log("no wizard exists, inserting step 2")

                Wizard.insert({
                    createdBy: Meteor.userId(),
                    wizardStep: "wizardStep2",
                    createdAt: new Date(),
                    onDay: today.setHours(0, 0, 0, 0)
                })

            } else {
                // existing entry
                console.log("Wizard exists, updating to step 2")

                Wizard.update({
                    createdBy: Meteor.userId(),
                    onDay: today.setHours(0, 0, 0, 0)
                }, {
                    $set: {
                        wizardStep: "wizardStep2"
                    }
                })
            }
        }
    }
}

Meteor.methods(methods)