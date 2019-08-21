class CommonUtilities{
    constructor(){
    }
    static makeHttpRequest(url,data,type){
        return $.ajax({
            type:type,
            url:url,
            data:data,
            contentType: 'application/json',
            dataType:'json'});
    }
}

let LoadingModal = {
    /**
     * =================================================================================================================
     * Loading Modal
     * =================================================================================================================
     * This object behaves like a static class and can be used to add or remove a loading modal without instantiation:
     *
     *     LoadingModal.add_loading_modal();
     *     LoadingModal.remove_loading_modal();
     *
     * This object is intended to provide an easy to use and consistent loading modal across the entire application.
     * =================================================================================================================
     */

    /**
     * Adds an animated loading modal to the DOM that prevents the user from clicking on anyting.
     */
    add_loading_modal: () => {
        let div = $(document.createElement('div'));
        div.attr('id', 'loading_modal');
        div.css('width', '100%');
        div.css('height', '100%');
        div.css('z-index', '1000');
        div.css('top', '0px');
        div.css('left', '0px');
        div.css('background-color', '#EFEFEF');
        div.css('opacity', '0.5');
        div.css('filter', 'alpha(opacity=50)');
        div.css('position', 'fixed');
        div.append('<i class="fa fa-spinner fa-pulse fa-4x" aria-hidden="true" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);"></i>');
        $(document.body).prepend(div);
    },
    /**
     * Removes the animated loading modal from the DOM allowing user to click on elements again.
     */
    remove_loading_modal: () => {
        $('#loading_modal').remove();
    }
};

let Requests = {
    /**
     * =================================================================================================================
     * Requests
     * =================================================================================================================
     * This object behaves like a static class and can be used to start a Promise chain without instantiation:
     *
     *     Requests.make_request('/GetData', 'POST', post_data).then((res) => {
     *         // Do something.
     *     }).then(() => {
     *         // Do something else.
     *     });
     *
     * This object is intended to be a lightweight wrapper to obscure away Ajax request code.  Can easily be expanded to
     * have more functions with different request options.
     * =================================================================================================================
     */

    /**
     * Returns a Promise which makes an HTTP request to the HOST URL + given route.
     * @param route string blueprint route.
     * @param type string request type. GET or POST.
     * @param data object optional data object to be posted.
     * @param lock boolean.  If true, spawns LoadingModal to prevent user from interacting with the DOM while a request
     * is active.
     * @return Ajax Promise.
     */
    make_request: (route, type='GET', data={}, lock=true, timeoutSeconds=30) => {
        return $.ajax({
            url: route,
            type: type,
            data: JSON.stringify(data),
            contentType: 'application/json',
            beforeSend: () => {
                if(typeof LoadingModal === 'object' && lock) LoadingModal.add_loading_modal();
            },
            complete: () => {
                if(typeof LoadingModal === 'object' && lock) LoadingModal.remove_loading_modal();
            },
            timeout:timeoutSeconds*1000,
            error: (xmlhttprequest, textstatus, message)=>{
                if(textstatus==='timeout')
                    bootbox.alert(message);
                else
                    bootbox.alert(message);
            }
        });
    }
};
