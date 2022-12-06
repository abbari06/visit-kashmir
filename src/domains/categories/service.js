const categories = require("../../base-model/categories");

class CategoriesService {

    listOfCategories(){
        return categories;
    }
}

module.exports = CategoriesService;