using Part_PartnerAPI.Models;
using Microsoft.Data.SqlClient;

namespace Part_PartnerAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _config;
        public UserRepository(IConfiguration config)
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

        public List<Users> GetAllUsers()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserName, Email, FirebaseUserId
                    FROM Users
                    ";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Users> users = new List<Users>();
                    while (reader.Read())
                    {
                        Users user = new Users
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                        };

                        users.Add(user);
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public Users GetByFirebaseUserId(string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserName, Email, FirebaseUserId
                    FROM Users
                    WHERE FirebaseUserId = @firebaseUserId
                    ";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Users users = new Users
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserName = reader.GetString(reader.GetOrdinal("UserName")),
                            Email = reader.GetString(reader.GetOrdinal("Email")),
                            FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                        };

                        reader.Close();
                        return users;

                    }
                    else
                    {
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void AddUser(Users users)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Users (UserName, Email, FirebaseUserId)
                    OUTPUT INSERTED.ID
                    VALUES (@userName, @email,@firebaseUserId)
                    ";
                    cmd.Parameters.AddWithValue("@userName", users.UserName);
                    cmd.Parameters.AddWithValue("@email", users.Email);
                    cmd.Parameters.AddWithValue("@firebaseUserId", users.FirebaseUserId);

                    int id = (int)cmd.ExecuteScalar();

                    users.Id = id;
                }
            }
        }

        public void UpdateUser(Users users)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Users 
                    SET 
                     UserName = @userName,
                     Email = @email
                    WHERE FirebaseUserId = @firebaseUserId
                    ";
                    cmd.Parameters.AddWithValue("@userName", users.UserName);
                    cmd.Parameters.AddWithValue("@email", users.Email);
                    cmd.Parameters.AddWithValue("@firebaseUserId", users.FirebaseUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUser (string firebaseUserId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE FROM Users
                    WHERE FirebaseUserId = @firebaseUserId
                    ";

                    cmd.Parameters.AddWithValue("@firebaseUserId", firebaseUserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

