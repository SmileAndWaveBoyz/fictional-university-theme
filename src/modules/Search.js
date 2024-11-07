import $ from 'jquery'

class Search{
    //1. Describe and create our object.
    constructor(){
        this.openButton = $('.js-search-trigger')
        this.closeButton = $('.search-overlay__close')
        this.searchOverlay = $('.search-overlay')
        this.events()
        this.isOverlayOpen = false
    }

    //2. Events
    events(){
        this.openButton.on('click', this.openOverlay.bind(this))
        this.closeButton.on('click', this.closeOverlay.bind(this))
        $(document).on('keyup', this.keyPressDispatcher.bind(this))
    }

    //3. Methods
    openOverlay(){
        this.searchOverlay.addClass('search-overlay--active')
        $('body').addClass('body-no-scroll')
        this.isOverlayOpen = true
    }

    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active')
        $('body').removeClass('body-no-scroll')
        this.isOverlayOpen = false
    }

    keyPressDispatcher(e){
        if (e.originalEvent.key == 's' && !this.isOverlayOpen) {
            this.openOverlay()
        }
        if (e.originalEvent.key == 'Escape' && !this.isOverlayOpen) {
            this.closeOverlay()
        }
    }
}

export default Search