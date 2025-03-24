import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.tsx";
import LoginReset from "./pages/LoginReset.tsx";

const DOMAIN = window.location.host;
console.log('DOMAIN', DOMAIN);

const NotFound = () => <h1>404 - Not Found</h1>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Login />} />
                <Route path="/auth/forgotlogin" element={<LoginReset />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
    //
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [redirectOption, setRedirectOption] = useState("portal");
    // const [redirectQuery, setRedirectQuery] = useState<string | null>(null);
    // const [apiHash, setApiHash] = useState<string | null>(null);
    // const [loading, setLoading] = useState(false);
    // const [hasToken, setHasToken] = useState(false);
    //
    // useEffect(() => {
    //     (async () => {
    //         // Check if token exists in localStorage
    //         const token = localStorage.getItem("ns_t");
    //         if (token) {
    //             setHasToken(true);
    //             console.log("User already logged in. Token found:", token);
    //             return; // No need to fetch API hash if user is already logged in
    //         }
    //
    //         // Get the 'redirect' query parameter from URL
    //         const queryParams = new URLSearchParams(window.location.search);
    //         const redirect = queryParams.get("redirect");
    //         setRedirectQuery(redirect);
    //         console.log("Redirect URL:", redirect);
    //
    //         // Fetch data from API to get hash
    //         const data = await fetch(`https://${DOMAIN}/portal/login/uccheck`)
    //             .then((res) => res.json())
    //             .catch((err) => console.error("Error fetching API hash:", err));
    //
    //         const hash = data?.api_hash;
    //         setApiHash(hash);
    //         console.log("API Hash:", hash);
    //     })();
    // }, []);
    //
    // const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (!apiHash) {
    //         console.error("API hash is not available.");
    //         return;
    //     }
    //
    //     setLoading(true); // Disable button and show spinner
    //     console.log("Logging in with:", { username, password, redirect: redirectQuery || redirectOption });
    //
    //     try {
    //         const response = await fetch(`https://${DOMAIN}/ns-api/oauth2/netsapiensJs`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Basic ${apiHash}`,
    //             },
    //             credentials: "include",
    //             body: JSON.stringify({
    //                 grant_type: "password",
    //                 username,
    //                 password,
    //                 scope: "netsapiens",
    //             }),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error("Login failed");
    //         }
    //
    //         const result = await response.json();
    //         console.log("Login Success:", result);
    //
    //         // Store token in localStorage
    //         localStorage.setItem("ns_t", result.token);
    //         handleRedirect(); // Redirect after login
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //     }
    // };
    //
    // const handleRedirect = () => {
    //     const redirectTo = redirectQuery || redirectOption;
    //     let baseUrl = `https://${DOMAIN}/`;
    //
    //     switch (redirectTo) {
    //         case "portal":
    //             baseUrl += "portal";
    //             break;
    //         case "webphone":
    //             baseUrl += "webphone";
    //             break;
    //         case "analytics":
    //             baseUrl += "analytics";
    //             break;
    //         default:
    //             baseUrl += "portal"; // Default to portal
    //             break;
    //     }
    //
    //     console.log("Redirecting to:", baseUrl);
    //     window.location.href = baseUrl; // Perform the redirect
    // };
    //
    // return (
    //     <Box sx={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
    //         <Card sx={{ padding: 3, minWidth: 320 }}>
    //             <CardContent>
    //                 <Typography variant="h5" sx={{ mb: 2 }}>
    //                     {hasToken ? "Redirect To" : "Login"}
    //                 </Typography>
    //
    //                 {/* If user has token, only show redirect dropdown */}
    //                 {hasToken ? (
    //                     <>
    //                         <FormControl fullWidth margin="normal">
    //                             <InputLabel id="redirect-label">Redirect To</InputLabel>
    //                             <Select
    //                                 labelId="redirect-label"
    //                                 value={redirectOption}
    //                                 onChange={(e) => setRedirectOption(e.target.value)}
    //                                 variant="outlined"
    //                             >
    //                                 <MenuItem value="portal">Portal</MenuItem>
    //                                 <MenuItem value="webphone">Webphone</MenuItem>
    //                                 <MenuItem value="analytics">Analytics</MenuItem>
    //                             </Select>
    //                         </FormControl>
    //                         <Button
    //                             variant="contained"
    //                             color="primary"
    //                             fullWidth
    //                             sx={{ mt: 2 }}
    //                             onClick={handleRedirect}
    //                         >
    //                             Go
    //                         </Button>
    //                     </>
    //                 ) : (
    //                     <form onSubmit={handleLogin}>
    //                         <TextField
    //                             label="Username"
    //                             variant="outlined"
    //                             fullWidth
    //                             margin="normal"
    //                             value={username}
    //                             onChange={(e) => setUsername(e.target.value)}
    //                         />
    //                         <TextField
    //                             label="Password"
    //                             type="password"
    //                             variant="outlined"
    //                             fullWidth
    //                             margin="normal"
    //                             value={password}
    //                             onChange={(e) => setPassword(e.target.value)}
    //                         />
    //
    //                         {!redirectQuery && (
    //                             <FormControl fullWidth margin="normal">
    //                                 <InputLabel id="redirect-label">Redirect To</InputLabel>
    //                                 <Select
    //                                     labelId="redirect-label"
    //                                     value={redirectOption}
    //                                     onChange={(e) => setRedirectOption(e.target.value)}
    //                                     variant="outlined"
    //                                 >
    //                                     <MenuItem value="portal">Portal</MenuItem>
    //                                     <MenuItem value="webphone">Webphone</MenuItem>
    //                                     <MenuItem value="analytics">Analytics</MenuItem>
    //                                 </Select>
    //                             </FormControl>
    //                         )}
    //
    //                         <Button
    //                             type="submit"
    //                             variant="contained"
    //                             color="primary"
    //                             fullWidth
    //                             sx={{ mt: 2 }}
    //                             disabled={loading}
    //                         >
    //                             {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
    //                         </Button>
    //                     </form>
    //                 )}
    //             </CardContent>
    //         </Card>
    //     </Box>
    // );
}

export default App;
