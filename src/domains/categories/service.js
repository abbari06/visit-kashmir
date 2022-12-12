const categories = [
  { icon: "sprint", text: "Events" },
  { icon: "park", text: "Parks" },
  { icon: "nature_people", text: "Nature" },
  { icon: "landscape", text: "Valleys" },
  { icon: "spa", text: "Gardens" },
  { icon: "monitor_heart", text: "Wellness" },
  { icon: "museum", text: "Museums" },
  { icon: "location_automation", text: "Landmarks" },
  { icon: "nightlife", text: "Nighlife" },
  { icon: "store", text: "Markets" },
  { icon: "sprint", text: "Sports" },
  { icon: "local_activity", text: "Activities" },
  { icon: "shopping_bag", text: "Shopping" },
  { icon: "restaurant", text: "Food Places" },
  { icon: "water_drop", text: "Water Falls" },
  { icon: "family_history", text: "Historic Sites" },
  { icon: "pets", text: "Wildlife Areas" },
  { icon: "mosque", text: "Religious Sites" },
  { icon: "temple_buddhist", text: "Ancient Ruins" },
  { icon: "directions_car", text: "Scenic Drives" },
  { icon: "water,", text: "Water Bodies" },
];

class CategoriesService {
  listOfCategories() {
    return categories;
  }
}

module.exports = CategoriesService;
