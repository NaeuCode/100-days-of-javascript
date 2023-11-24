particlesJS("background", {
    particles: {
        number: {
            value: 21, //Number of particles
            density: {
                enable: true,
                value_area: 250, //Area where particles will be distributed
            },
        },
        color: {
            value: "#000", //Particle color
        },
        shape: {
            type: "circle", //Shape Type
        },
        opacity: {
            value: .7, //base opacity of particles
            random: true,
            anim: {
                enable:true,
                speed:.3 , //animation seed
                opacity_min: .1, //minimum opacity during animation
                sync:false, //sync animation
            },
        },

        size: {
            value: 6, //base size of particles
            random: true,
            anim: {
                enable: true,
                speed: 4, //animation speed for size changes
                size_min: 1.3, //minimum size during animation
                sync: false,
            },
        },

        line_linked: {
            enable:true, //enable connecting lines between particles
            distance: 150, //maximum distance between linked particles
            color: "#000",
            opacity: .8,
            width: 1,
        },
        move: {
            enable: true, //enable particle movement
            speed:2,
            direction: "none",
            random:false,
            straight: false,
            out_mode:"bounce", //behavior when particles move out of the canvas
            bounce: false,
        },
    },

    interactivity: {
        detect_on: "window", //detect interactions on the window
        events: {
            onhover:{
                enable: true, //enable hover interactivity
                mode: "repulse", //repulse particles on hover
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true, //resize particles animation on window resize
        },
    },
    retina_detect: true, //detect retina displays
});