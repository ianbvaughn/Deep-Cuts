export class Token {

    /** @type {string} */
    static clientId = process.env.CLIENT_ID;
    /** @type {string} */
    static clientSecret = process.env.CLIENT_SECRET;

    constructor(tokenParams) {
        this._token = tokenParams.access_token;
        this._expiresAt = Date.now() + tokenParams.expires_in * 1000;
        this._refreshToken = tokenParams.refresh_token;
        this._generateHeader();
    };

    _generateHeader() {
        this._headers = {
            'Authorization': 'Bearer ' + this._token
        };
    };

    async authenticatedFetch(url, method) {
        if (this._isExpired()) {
            await this.refreshToken();
        }

        return await fetch(url, {
            method: method,
            headers: this.headers
        });
    }

    _isExpired() {
        return Date.now() > this._expiresAt;
    }

    _isValid() {
        return !this._isExpired() && this._token.length > 0;
    }

    get headers() {
        return this._headers;
    }

    async refreshToken() {

        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: this._refreshToken
        });

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(Token.clientId + ':' + Token.clientSecret).toString('base64')
                },
                body: body
            });
            if (response.ok) {
                const data = await response.json();
                this._token = data.access_token;
                this._expiresAt = Date.now() + data.expires_in * 1000;
                this._refreshToken = data.refresh_token || this._refreshToken;
                // Per Spotify documentation: "Depending on the grant used to get the initial refresh token, a refresh
                // token might not be included in each response. When a refresh token is not returned, continue using
                // the existing token." Per these instructions, we will fall back on the original refresh token when
                // one is not provided.
                this._generateHeader();
            } else {
                console.log('Token refresh failed');
            }
        } catch {
            console.log('Request failed');
        }
    }
}