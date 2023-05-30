class seatBelts {

    constructor() {
        this.player = mp.players.local;
        this.key = 74; // J key
        this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN = 32;
        this.toggle = true;

        this.config = {
            blockedClasses: [13, 14, 15, 16, 21, 8],
        }

        mp.events.add({
            'toggleBelt': () => {
                if(mp.players.local) {
                    if(this.config.blockedClasses.indexOf(mp.players.local.vehicle.getClass()) !== -1) {return mp.gui.chat.push("This vehicle doesn't have a seatbelt.")}
                    else { this.toggleSeatBelt(); }
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
            if(!mp.players.local.isTypingInTextChat && mp.players.local.vehicle) {
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
        mp.gui.chat.push('You have buckled your seatbelt.') // Insert custom notification event
    }

    beltOff() {
        this.player.hasSBelt = false
        this.player.setConfigFlag(this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN, true);
        mp.gui.chat.push('You have unbuckled your seatbelt.') // Insert custom notification event
    }

}

new seatBelts();
