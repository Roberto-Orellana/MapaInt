using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Windows;

namespace MapaInteractivo
{
    public partial class mapaRef : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            coordenadasData();
        }

        [WebMethod]
        public static string coordenadasData()
        {

            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
                {
                    /* MiPC*/
                    
                };

                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();

                    String sql = "SELECT * FROM Mapa";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            var data = new List<coordenada>();

                            while (reader.Read())
                            {
                                var dataAdd = new coordenada
                                {
                                    id = int.Parse(reader["id"].ToString()),
                                    nombre = reader["nombre"].ToString(),
                                    zoom = int.Parse(reader["zoon"].ToString()),
                                    lat = reader["lat"].ToString(),
                                    lng = reader["lng"].ToString()
                                };
                                data.Add(dataAdd);
                            }
                            string json = JsonConvert.SerializeObject(data);

                            return json;
                        }
                    }
                }
            }
            catch (SqlException)
            {
                return null;
            }
        }

        [WebMethod]
        public static string detalle(){
            try
            {
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
                {
                    /* MiPC*/
                  
                };

                using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
                {
                    connection.Open();

                    String sql = @"SELECT DISTINCT detalle
                                   FROM DetallesDeMapa
                                   INNER JOIN Mapa
                                   ON id_pk = 3";

                    using (SqlCommand command = new SqlCommand(sql, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            var data = new List<detalles>();

                            while (reader.Read())
                            {
                                var dataAdd = new detalles
                                {
                     
                                   detalle = reader["detalle"].ToString(),
                                
                                };

                                data.Add(dataAdd);
                            }
                            string json = JsonConvert.SerializeObject(data);

                            return json;
                        }
                    }
                }
            }
            catch (SqlException)
            {
                return null;
            }
      
        }
    }
}
public class coordenada
{
    public int id { get; set; }
    public string nombre { get; set; }
    public int zoom { get; set; }
    public string lat { get; set; }
    public string lng { get; set; }

}

//Generar otra clase para las categorias
public class detalles
{
    public string detalle { get; set; }

}