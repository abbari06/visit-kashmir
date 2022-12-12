const categories = [
  {"icon": "Icons.sprint", "text": "Events"},
  {"icon": "Icons.park", "text": "Parks"},
  {"icon": "Icons.nature_people", "text": "Nature"},
  {"icon": "Icons.landscape", "text": "Valleys"},
  {"icon": "Icons.spa", "text": "Gardens"},
  {"icon": "Icons.monitor_heart", "text": "Wellness"},
  {"icon": "Icons.museum", "text": "Museums"},
  {"icon": "Icons.location_automation", "text": "Landmarks"},
  {"icon": "Icons.nightlife", "text": "Nightlife"},
  {"icon": "Icons.store", "text": "Markets"},
  {"icon": "Icons.sprint", "text": "Sports"},
  {"icon": "Icons.local_activity", "text": "Activities"},
  {"icon": "Icons.shopping_bag", "text": "Shopping"},
  {"icon": "Icons.restaurant", "text": "Food Places"},
  {"icon": "Icons.water_drop", "text": "Water Falls"},
  {"icon": "Icons.family_history", "text": "Historic Sites"},
  {"icon": "Icons.pets", "text": "Wildlife Areas"},
  {"icon": "Icons.mosque", "text": "Religious Sites"},
  {"icon": "Icons.temple_buddhist", "text": "Ancient Ruins"},
  {"icon": "Icons.directions_car", "text": "Scenic Drives"},
  {"icon": "Icons.water,", "text": "Water Bodies"}
];

class CategoriesService {
  listOfCategories() {
    return categories;
  }
}

module.exports = CategoriesService;
