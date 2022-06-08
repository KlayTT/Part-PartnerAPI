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
                        SELECT Id, [Name], Color, Year, ImageUrl, PartId, [Uid]
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

        public Cars GetCarById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], Color, Year, ImageUrl, PartId, [Uid]
                        FROM Cars
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Cars cars = new Cars
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
                            cars.PartId = reader.GetString(reader.GetOrdinal("PartId"));
                        }

                        reader.Close();
                        return cars;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddCar(Cars cars)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Cars ([Name], Color, Year, ImageUrl, PartId, [Uid])
                    OUTPUT INSERTED.ID
                    VALUES (@name, @color, @year, @ImageUrl, @PartId, @uid)
                ";
                    cmd.Parameters.AddWithValue("@name", cars.Name);
                    cmd.Parameters.AddWithValue("@color", cars.Color);
                    cmd.Parameters.AddWithValue("@year", cars.Year);
                    cmd.Parameters.AddWithValue("@ImageUrl", cars.ImageUrl);
                    cmd.Parameters.AddWithValue("@uid", cars.Uid);

                    if (cars.PartId == null)
                    {
                        cmd.Parameters.AddWithValue("@PartId", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@PartId", cars.PartId);
                    }

                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    cars.Id = newlyCreatedId;
                }
            }
        }

        public void UpdateCar(Cars cars)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Cars
                    SET
                        [Name] = @name,
                        Color = @color,
                        Year = @year,
                        ImageUrl = @ImageUrl,
                        PartId = @PartId,
                        [Uid] = @uid
                    WHERE Id = @id
                ";

                    cmd.Parameters.AddWithValue("@name", cars.Name);
                    cmd.Parameters.AddWithValue("@color", cars.Color);
                    cmd.Parameters.AddWithValue("@year", cars.Year);
                    cmd.Parameters.AddWithValue("@ImageUrl", cars.ImageUrl);
                    cmd.Parameters.AddWithValue("@uid", cars.Uid);
                    cmd.Parameters.AddWithValue("@id", cars.Id);

                    if (cars.PartId == null)
                    {
                        cmd.Parameters.AddWithValue("@PartId", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@PartId", cars.PartId);
                    }

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCar(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Cars
                    WHERE Id = @id
                ";
                    cmd.Parameters.AddWithValue("id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
