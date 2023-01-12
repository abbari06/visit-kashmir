const categories = [
  {"icon": "f81f", "text": "Events"},
  {"icon": "ea63", "text": "Parks"},
  {"icon": "e407", "text": "Nature"},
  {"icon": "e3f7", "text": "Valleys"},
  {"icon": "eb4c", "text": "Gardens"},
  {"icon": "eaa2", "text": "Wellness"},
  {"icon": "ea36", "text": "Museums"},
  {"icon": "f14f", "text": "Landmarks"},
  {"icon": "ea62", "text": "Nightlife"},
  {"icon": "e8d1", "text": "Markets"},
  {"icon": "f81f", "text": "Sports"},
  {"icon": "e53f", "text": "Activities"},
  {"icon": "f1cc", "text": "Shopping"},
  {"icon": "e56c", "text": "FoodPlaces"},
  {"icon": "e798", "text": "Water Falls"},
  {"icon": "e0ad", "text": "Historic Sites"},
  {"icon": "e91d", "text": "Wildlife Areas"},
  {"icon": "eab2", "text": "Religious Sites"},
  {"icon": "eab3", "text": "Ancient Ruins"},
  {"icon": "e531", "text": "Scenic Drives"},
  {"icon": "f084", "text": "Water Bodies"}
];

class CategoriesService {
  listOfCategories() {
    return categories;
  }
}

module.exports = CategoriesService;
