export interface JwtDecode {
    access_token?: String;
    authorities?: Array<String>;
    client_id?: String;
    exp?: Number;
    jti?: String;
    scope?: Array<String>;
    user_name?: String;
    name: String;
}
