import { Button, Container, Row, Col, Card } from "react-bootstrap";

interface SystemMessagesProps {}

const SystemMessages: React.FC<SystemMessagesProps> = ({}) => {
  return (
    <Container
      className="system"
      id="hanging-icons"
      // Top Right Bottom Left
      style={{ padding: "3rem 0rem 1rem 0rem", margin: "0 auto" }}
    >
      <h2 className="pb-1 border-bottom display-6 text-center">
        System Messages
      </h2>
      <div style={{ marginTop: "3rem" }}>
        <Card>
          <Card.Body>
            <p className="border-bottom">
              Post: New Park/flag was dismissed / Reason: Post met acceptable
              standards{"  "}
              <button
                style={{
                  height: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Dismiss Message
              </button>
            </p>

            <p className="border-bottom">
              Comment: Dog Fountain at Mac.../flag was dismissed / Reason: Post
              met acceptable standards{"  "}
              <button
                style={{
                  height: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Dismiss Message
              </button>
            </p>
            <p className="border-bottom">
              Your Post: Shoot the dogs / was flagged and Quarantine / Reason:
              Has abusive language, is hostile to a community segment{"  "}
              <button
                style={{
                  height: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Dismiss Message
              </button>
            </p>
            <p className="border-bottom">
              New Community: West Bay / Is now active and you are located within
              it{"  "}
              <button
                style={{
                  height: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Join
              </button>
              {"  "}
              <button
                style={{
                  height: "1.5rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Dismiss Message
              </button>
            </p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SystemMessages;
