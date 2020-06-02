const maps = ["Altar of Flame",
    "Distant Shore",
    "Emperor's Respite",
    "Endless Vale",
    "Eternity",
    "Javelin-4",
    "Legion's Gulch",
    "Midtown",
    "Retribution",
    "The Dead Cliffs",
    "The Fortress",
    "Vostok",
    "Pacifica",
    "Radiant Cliffs",
    "Wormhaven",
    "The Burnout",
    "Solitude",
    "Meltdown",
    "Bannerfall",
    "Convergence",
    "Equinox",
    "Firebase Echo",
    "The Citadel",
    "Gambler's Ruin",
    "Fragment",
    "Twilight Gap",
    "Widow's Court",
    "Rusted Lands",
    "The Anomaly",
    "Exodus Blue",
    "The Cauldron"
]

// https://www.destinykd.com/images/glory-rank3.png

let random = (n) => Math.floor(Math.random() * (n + 1));

const vue = new Vue({
    el: "#app",
    data: {
        games: [
            /*{
                        map:"Twilight Gap",
                        played:3,
                        // victory: true,
                        score:4,
                        kills:7,
                        deaths:9,
                        assists:2,
                    },
                    {
                        map:"Convergence",
                        played:2,
                        // victory: false,
                        score:3,
                        kills:2,
                        deaths:19,
                        assists:1,
                    },
                    {
                        map:"Pacifica",
                        played:1,
                        // victory: false,
                        score:2,
                        kills:1,
                        deaths:7,
                        assists:2,
                    }*/
        ],
        time: 0,
        score: 0,
        ended: false,
        started: false
    },
    created() {
        if (this.started) {
            this.start()
        }
    },
    methods: {
        start() {
            this.ended = false;
            this.started = true;
            this.score = 0;
            this.time = 0;
            this.games = [];
            let counter = 100;
            let self = this;
            var loop = () => {
                if (this.score >= 5500) {
                    self.ended = true;
                } else if (counter > 0) {
                    counter--;
                    self.addRandom()
                    setTimeout(loop, 1000);
                } else {
                    self.ended = true;
                }
                // self.score += random(100)
            }
            setTimeout(loop, 0);
            // const interval = setInterval(function () {
            //     // console.log(counter--)
            // }, 1500)
        },
        addRandom() {
            this.time += 5 + random(10)
            let win = Math.random() < this.chance(this.score) ? true : false;
            if (win) {
                this.games.unshift({
                    map: maps[Math.floor(Math.random() * maps.length)],
                    played: this.time,
                    // victory: false,
                    score: 4,
                    kills: Math.max(random(12), random(12)),
                    deaths: Math.min(random(20), random(20)),
                    assists: Math.max(random(6), random(6)),
                });
                this.score = Math.min(this.score + 40 + random(120), 5500)
                // beginners boost
                if (this.score < 2500) {
                    this.score += Math.min(this.score * 0.33, (2500 - this.score) * 0.33)
                    this.score |= 0;
                }
            } else {
                this.games.unshift({
                    map: maps[Math.floor(Math.random() * maps.length)],
                    played: this.time,
                    score: random(3),
                    kills: Math.min(random(12), random(12)),
                    deaths: Math.max(random(16), random(16)),
                    assists: Math.min(random(6), random(6)),
                });
                this.score = Math.max(this.score - random(40), 0);
            }
            let brejk = Math.random();
            if (brejk < 0.04) {
                // long break
                this.time += 240 + random(480)
            } else if (brejk < 0.2) {
                // short break
                this.time += 30 + random(60)
            } else {
                this.time += 1 + random(3)
            }
        },
        chance(score) {
            if (score < 200) return 0.9
            if (score < 1050) return 0.8
            if (score < 2100) return 0.7
            if (score < 3500) return 0.5
            if (score < 5450) return 0.3
            if (score < 5500) return 0.2
            return 1
        }
    },
    filters: {
        moment: function (value) {
            return moment().subtract(value, 'minutes').fromNow()
        },
        fixed(value) {
            return parseFloat(value).toFixed(2)
        },
        rank(score) {
            if (score < 200) return "Guardian"
            if (score < 1050) return "Brave"
            if (score < 2100) return "Heroic"
            if (score < 3500) return "Fabled"
            if (score < 5450) return "Mythic"
            if (score < 5500) return "Legend"
            return "Max"
        }
    }
})