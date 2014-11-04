function DotsFilter() {

    return function(input, len) {
        if (input) {
            return input.substring(0, len - 1) + (input.length > len - 1 ? '...' : '');
        }
    };

}