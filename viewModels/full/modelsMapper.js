'use strict';

module.exports = function () {
    let mapper = {};
    
    mapper.user = function (inputModel) {
        return inputModel;
    }
    
    mapper.unit = function (inputModel) {
        return inputModel;
    }
    
    return mapper;
}