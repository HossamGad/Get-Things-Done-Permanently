
namespace Get_things_done_Api.Configuration

{

    public class JwtBearerTokenSettings

    {

        public string SecretKey { get; set; }

        public string Audience { get; set; }

        public string Issuer { get; set; }

        public int ExpiryTimeInSeconds { get; set; }

    }

}