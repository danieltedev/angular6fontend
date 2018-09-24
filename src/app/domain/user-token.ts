export interface UserToken {
    authorities?: Array<String>;
    client_id?: String;
    exp?: Number;
    jti?: String;
    scope?: Array<String>;
    user_name?: String;
}
