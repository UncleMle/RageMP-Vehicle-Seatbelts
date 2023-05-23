class seatBelts {

    constructor() {
        this.player = mp.players.local
        this.key = 74 // J key
        this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN = 32
        this.toggle = true;

        this.config = {
            blockedClasses: [13, 14, 15, 16, 21, 8],
        }

        mp.events.add({
            'toggleBelt': () => {
                if(this.player.vehicle) {
                    if(!this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {return mp.events.call('requestBrowser', `gui.notify.showNotification("This vehicle doesn't have a seatbelt.", false, true, 7000, 'fa-solid fa-triangle-exclamation')`)}
                    this.toggleSeatBelt();
                }
            },
            "playerLeaveVehicle": (vehicle, seat) => {
                if(this.player.hasSBelt == true) {
                    this.toggle = true;
                    this.beltOff()
                }
            }
        })

        mp.keys.bind(this.key, true, function() {
            if(!mp.players.local.isTypingInTextChat) {
                mp.events.call('toggleBelt');
            }
        });

    }

    toggleSeatBelt() {
        this.toggle = !this.toggle;
        if(this.toggle) {
            if(this.player.vehicle) {
                this.beltOff();
            }
        }
        else if(!this.toggle) {
            if(this.player.vehicle) {
                this.beltOn();
            }
        }
    }

    beltOn() {
        this.player.hasSBelt = true
        this.player.setConfigFlag(this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN, false);
        mp.events.call('ameCreate', 'Buckles seatbelt') // Send a message to player (You can implement your own system for that)
    }

    beltOff() {
        this.player.hasSBelt = false
        this.player.setConfigFlag(this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN, true);
        mp.events.call('ameCreate', 'Unbuckles seatbelt') // Send a message to player (You can implement your own system for that)
    }

}

new seatBelts();
