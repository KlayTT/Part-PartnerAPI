using Part_PartnerAPI.Models;
using Microsoft.Data.SqlClient;

namespace Part_PartnerAPI.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly IConfiguration _config;
        public CarRepository(IConfiguration config)
        {
            _config = config;
        }
        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        public List<Cars> GetAllCars()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Color, Year, ImageUrl, PartId, Uid
                        FROM Cars
                    ";
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Cars> cars = new List<Cars>();
                    while (reader.Read())
                    {
                        Cars car  = new Cars
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Year = reader.GetString(reader.GetOrdinal("Color")),
                            Color = reader.GetString(reader.GetOrdinal("Year")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Uid = reader.GetString(reader.GetOrdinal("Uid")),
                        };
                        if (reader.IsDBNull(reader.GetOrdinal("PartId")) == false)
                        {
                            car.PartId = reader.GetString(reader.GetOrdinal("PartId"));
                        }

                        cars.Add(car);
                    }
                    reader.Close();

                    return cars;
                }
            }
        }
    }
}
