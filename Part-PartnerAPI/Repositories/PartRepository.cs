using Part_PartnerAPI.Models;
using Microsoft.Data.SqlClient;

namespace Part_PartnerAPI.Repositories
{
    public class PartRepository : IPartRepository
    {
        private readonly IConfiguration _config;
        public PartRepository(IConfiguration config)
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

        public List<Parts> GetAllParts(string uid)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name], Price, ImageURL, Miles, DatePurchased, NextMatnience, [Uid]
                       FROM Parts
                       WHERE [Uid] = @uid;
                    ";

                    cmd.Parameters.AddWithValue("@uid", uid);
                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Parts> parts = new List<Parts>();
                    while (reader.Read())
                    {
                        Parts part = new Parts
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Price = (double)reader.GetDecimal(reader.GetOrdinal("Price")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Uid = reader.GetString(reader.GetOrdinal("Uid")),
                        };
                        if (reader.IsDBNull(reader.GetOrdinal("Miles")) == false)
                        {
                            part.Miles = reader.GetString(reader.GetOrdinal("Miles"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("DatePurchased")) == false)
                        {
                            part.DatePurchased = reader.GetString(reader.GetOrdinal("DatePurchased"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("NextMatnience")) == false)
                        {
                            part.NextMatnience = reader.GetString(reader.GetOrdinal("NextMatnience"));
                        }

                        parts.Add(part);
                    }
                    reader.Close();

                    return parts;
                }
            }
        }

        public Parts GetPartById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, [Name], Price, ImageURL, Miles, DatePurchased, NextMatnience, [Uid]
                        FROM Parts
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Parts parts = new Parts
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            Price = (double)reader.GetDecimal(reader.GetOrdinal("Price")),
                            ImageUrl = reader.GetString(reader.GetOrdinal("ImageUrl")),
                            Uid = reader.GetString(reader.GetOrdinal("Uid")),
                        };
                        if (reader.IsDBNull(reader.GetOrdinal("Miles")) == false)
                        {
                            parts.Miles = reader.GetString(reader.GetOrdinal("Miles"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("DatePurchased")) == false)
                        {
                            parts.DatePurchased = reader.GetString(reader.GetOrdinal("DatePurchased"));
                        }
                        if (reader.IsDBNull(reader.GetOrdinal("NextMatnience")) == false)
                        {
                            parts.NextMatnience = reader.GetString(reader.GetOrdinal("NextMatnience"));
                        }

                        reader.Close();
                        return parts;
                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddPart(Parts parts)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Parts ([Name], Price, ImageURL, Miles, DatePurchased, NextMatnience, [Uid])
                        OUTPUT INSERTED.ID
                        VALUES (@name, @price, @imageUrl, @miles, @datePurchased, @nextMatnience, @uid)
                    ";

                    cmd.Parameters.AddWithValue("@name", parts.Name);
                    cmd.Parameters.AddWithValue("@price", parts.Price);
                    cmd.Parameters.AddWithValue("@imageUrl", parts.ImageUrl);
                    cmd.Parameters.AddWithValue("@uid", parts.Uid);

                    if (parts.Miles == null)
                    {
                        cmd.Parameters.AddWithValue("@miles", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@miles", parts.Miles);
                    }
                    if (parts.DatePurchased == null)
                    {
                        cmd.Parameters.AddWithValue("@datePurchased", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@datePurchased", parts.DatePurchased);
                    }
                    if (parts.NextMatnience == null)
                    {
                        cmd.Parameters.AddWithValue("@nextMatnience", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@nextMatnience", parts.NextMatnience);
                    }

                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    parts.Id = newlyCreatedId;
                }

            }
        }

        public void UpdatePart(Parts parts)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Parts
                    SET
                       [Name] = @name,
                        Price = @price,
                        ImageURL = @imageUrl,
                        Miles = @miles,
                        DatePurchased = @datePurchased,
                        NextMatnience = @nextMatnience,
                        Uid = @uid
                    WHERE Id = @id 
                    ";

                    cmd.Parameters.AddWithValue("@name", parts.Name);
                    cmd.Parameters.AddWithValue("@price", parts.Price);
                    cmd.Parameters.AddWithValue("@imageUrl", parts.ImageUrl);
                    cmd.Parameters.AddWithValue("@uid", parts.Uid);

                    if (parts.Miles == null)
                    {
                        cmd.Parameters.AddWithValue("@miles", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@miles", parts.Miles);
                    }
                    if (parts.DatePurchased == null)
                    {
                        cmd.Parameters.AddWithValue("@datePurchased", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@datePurchased", parts.DatePurchased);
                    }
                    if (parts.NextMatnience == null)
                    {
                        cmd.Parameters.AddWithValue("@nextMatnience", DBNull.Value);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@nextMatnience", parts.NextMatnience);
                    }

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeletePart(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Parts
                    WHERE Id = @id
                ";
                    cmd.Parameters.AddWithValue("id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
