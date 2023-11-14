//Configuration Options for the Flickity carousel
const options = {
    accessibility: true, //Enable keyboard navigation and screen reader support
    prevNextButtons:true, //show previous and next buttons
    pageDots: true, //show dots indicating current slide position
    setGallerySize: false, //Don't Adjust size based on selected cell

    //Custom arrow shape for navigation buttons
    arrowShape: {
        x0:1,
        x1:58,
        y1:62,
        x2:55,
        y2:48,
        x3:18
    },

    autoPlay:3000,
    pauseAutoPlayOnHover: false,
    pauseAutoPlayOnFocus:false
};

//Function to set the background position of each slide based on the Flickity scroll position
function setBgPosition(slide, index){
    //Calculate the background position
    const x = -(slide.target + flkty.x) /6;

    //set the background position for the current slide
    slides[index].style.backgroundPosition = `${x}px`;

}

//Select the carousel element using its attribute [carousel]
const carousel = document.querySelector('[carousel]');
//convert the HTMLCollection of slide elements to an Array
const slides = Array.from(document.getElementsByClassName('carousel-cell'));
//create a new instance of Flickity with the specified options
const flkty = new Flickity(carousel, options);

//Add an event listener for the Flickity scroll event
flkty.on('scroll', () => {
    //restart autoplay when manually scrolling
    flkty.playPlayer();
});

//Add an event listener for Flickity ready event
flkty.on('ready', () => {
    //start autoplay when flickity is ready
    flkty.playPlayer();
})