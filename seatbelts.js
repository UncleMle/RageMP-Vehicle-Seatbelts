class seatBelts {

    constructor() {
        this.player = mp.players.local
        this.key = 74
        this.PED_FLAG_CAN_FLY_THRU_WINDSCREEN = 32
        this.PED_FLAG_INJURED_LIMP = 166;
        this.toggle = true;

        this.config = {
            blockedClasses: [13, 14, 15, 16, 21, 8],
        }

        mp.events.add({
            'toggleBelt': () => {
                if(this.player.vehicle && this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {
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

        // J key
        mp.keys.bind(this.key, false, function() {
            if(!mp.players.local.isTypingInTextChat) {
                mp.events.call('toggleBelt');
            }
        });

    }

    toggleSeatBelt() {
        this.toggle = !this.toggle;
        switch(toggle) {
            case false:
                {
                    if(this.player.vehicle && this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {
                        this.beltOn();
                    }

                    if(this.player.vehicle && !this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {
                        mp.events.call('requestBrowser', [`gui.notify.showNotification("This vehicle doesn't have a seatbelt", false, true, 7000, 'fa-solid fa-triangle-exclamation')`])
                    }
                    break;
                }
            case true:
                {
                    if(this.player.vehicle && this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {
                        this.beltOff();
                    }

                    if(this.player.vehicle && !this.config.blockedClasses.indexOf(this.player.vehicle.getClass()) == -1) {
                        mp.events.call('requestBrowser', [`gui.notify.showNotification("This vehicle doesn't have a seatbelt", false, true, 7000, 'fa-solid fa-triangle-exclamation')`])
                    }
                    break;
                }
            default:
                break;
        }

    }

    beltOn() {
        this.player.hasSBelt = true
        this.player.setConfigFlag(PED_FLAG_CAN_FLY_THRU_WINDSCREEN, false);
        mp.events.call('ameCreate', 'Buckles seatbelt')
    }

    beltOff() {
        this.player.hasSBelt = false
        this.player.setConfigFlag(PED_FLAG_CAN_FLY_THRU_WINDSCREEN, true);
        mp.events.call('ameCreate', 'Unbuckles seatbelt')
    }

}

const seatBelt = new seatBelts();
