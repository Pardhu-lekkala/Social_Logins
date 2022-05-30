import React from "react";
import styled from "styled-components";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import { useNavigate } from "react-router";

function LinkedInPage() {
  const navigate = useNavigate();
  const { linkedInLogin } = useLinkedIn({
    clientId: "77u5qwljr7zkov",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      // getUserEmailId();
      setCode(code);
      setErrorMessage("");
    },
    scope: "r_emailaddress r_liteprofile",
    onError: (error) => {
      console.log(error);
      //setCode("");
      setErrorMessage(error.errorMessage);
    },
  });
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  console.log(code, "access token");

  // const getUserEmailId = async (data) => {
  //   if (!code) {
  //     const response = await fetch(
  //       `https://api.linkedin.com/v2/clientAwareMemberHandles?  q=members&projection=(elements*(primary,type,handle~))`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + code,
  //           "Access-Control-Request-Method": "GET",
  //           "Access-Control-Request-Headers": "Content-Type, Authorization",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );
  //     const emailpayload = await response.json();
  //     console.log(emailpayload, "email payload");
  //   } else {
  //     console.log("err linkedin");
  //   }
  // };

  if (code) {
    localStorage.setItem("linkedInToken", code);
  }

  if (code) {
    navigate("/home");
  }

  return (
    <div>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: "100%", height: "100%", cursor: "pointer" }}
      />

      {code && (
        <div>
          <div>Authorization Code: {code}</div>
          <div>
            Follow{" "}
            <Link
              target="_blank"
              href="https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fconsumer%2Fcontext&tabs=HTTPS#step-3-exchange-authorization-code-for-an-access-token"
              rel="noreferrer"
            >
              this
            </Link>{" "}
            to continue
          </div>
        </div>
      )}
      {/* {errorMessage && <div>{errorMessage}</div>} */}
    </div>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Link = styled.a`
  font-size: 20px;
  font-weight: bold;
`;

export default LinkedInPage;
