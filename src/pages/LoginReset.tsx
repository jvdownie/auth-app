import {FormEvent, useEffect, useState} from "react";
import {
    Box, Card, CardContent, TextField, Button, Typography,
    CircularProgress
} from "@mui/material";
import { Base64 } from 'js-base64';

const DOMAIN = window.location.host;
console.log('DOMAIN', DOMAIN);

function LoginReset() {
    const [email, setEmail] = useState("");
    const [extension, setExtension] = useState("");
    const [loading, setLoading] = useState(false);
    const [apiHash, setApiHash] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const data = await fetch(`https://${DOMAIN}/portal/login/uccheck`)
                .then((res) => res.json())
                .catch((err) => console.error("Error fetching API hash:", err));

            const hash = data?.api_hash;
            setApiHash(hash);
        })();
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const decodedApiHash = Base64.decode(apiHash!);
        const clientId = decodedApiHash.split(':');

        await fetch(`https://${DOMAIN}/ns-api/?object=email&action=create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: 'Your Login Recovery',
                template: 'forgotten_username_email.php',
                app_uri: `${DOMAIN}/auth/password-reset/`,
                recipient: email,
                user: extension || null,
                client_id: clientId,
            })
        });

         // todo confirmation dialog
    };

    return (
        <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
            <Card sx={{ padding: 3, minWidth: 320 }}>
                <CardContent>
                    <Typography variant="h5" sx={{mb: 2}}>
                        Forgot Login Name
                    </Typography>
                    <Typography sx={{mb: 2}}>
                        Please provide the email and user extension linked to your account so we can email you your Login Name
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Extension"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={extension}
                            onChange={(e) => setExtension(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{mt: 2}}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit"/> : "Send"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default LoginReset;
