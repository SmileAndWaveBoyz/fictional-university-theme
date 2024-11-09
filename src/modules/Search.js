import $ from 'jquery'

class Search{
    //1. Describe and create our object.
    constructor(){
        this.resultsDiv = $('#search-overlay__results')
        this.openButton = $('.js-search-trigger')
        this.closeButton = $('.search-overlay__close')
        this.searchOverlay = $('.search-overlay')
        this.searchField = $('#search-term')
        this.events()
        this.isOverlayOpen = false
        this.isSpinnerVisible = false
        this.previousValue
        this.typingTimer
    }

    //2. Events
    events(){
        this.openButton.on('click', this.openOverlay.bind(this))
        this.closeButton.on('click', this.closeOverlay.bind(this))
        $(document).on('keyup', this.keyPressDispatcher.bind(this))
        this.searchField.on('keyup', this.typingLogic.bind(this))
    }

    //3. Methods
    typingLogic(){
        if (this.searchField.val() !== this.previousValue) {

            clearTimeout(this.typingTimer)

            if (this.searchField.val()) {
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"></div>')
                    this.isSpinnerVisible = true
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 2000)

            }else{
                this.resultsDiv.html('')
                this.isSpinnerVisible = false
            }

        }
        this.previousValue = this.searchField.val()
    }

    getResults(){
        $.getJSON(`http://fictional-university.local/wp-json/wp/v2/posts?search=${this.searchField.val()}`, (posts) => {
            alert(posts[0].title.rendered)
        })


        this.isSpinnerVisible = false
    }

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
        if (e.originalEvent.key == 's' && !this.isOverlayOpen && !$('input, textarea').is(':focus')) {
            this.openOverlay()
        }
        if (e.originalEvent.key == 'Escape' && !this.isOverlayOpen) {
            this.closeOverlay()
        }
    }
}

export default Search