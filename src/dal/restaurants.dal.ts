import Chefs from '../db/models/chefs';
import Restaurants from '../db/models/restaurants';

export class RestaurantsDal {
  public async createRestaurant(restaurant: any) {
    restaurant = new Restaurants({
      name: restaurant.ResturantName,
      image: restaurant.ResturantImage,
      id: restaurant.ID,
      chef: restaurant.CheifName,
      rate: restaurant.Rate,
      since: restaurant.Since,
      working_Days: restaurant.working_Days,
    });

    const response = await Restaurants.create(restaurant);
    const result = await Chefs.findOne({ name: response.chef }).updateOne({
      $push: { restaurants: response._id },
    });
    return response;
  }

  public async findAll() {
    const data = await Restaurants.aggregate([
      {
        $project: {
          _id: false,
        },
      },
    ]);
    return data;
  }
}
