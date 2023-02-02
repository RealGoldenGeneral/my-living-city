import { Button } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "src/lib/constants";

const StripeCheckoutButton: React.FC<any> = (params) => {
  const { status, user } = params;

  const activateAccountCall = async () => {
    const res = await axios.post(`${API_BASE_URL}/account/activate`, {
      userId: user.id,
    });
    window.location.href = res.data.url;
  };
  const updateAccountCall = async () => {
    const res = await axios.post(`${API_BASE_URL}/account/update`, {
      userId: user.id,
    });
    window.location.href = res.data.url;
  };

  return (
    <>
      {status === "active" ? (
        <Button onClick={updateAccountCall}>Modify</Button>
      ) : (
        <Button onClick={activateAccountCall}>Activate</Button>
      )}
    </>
  );
};

export default StripeCheckoutButton;
