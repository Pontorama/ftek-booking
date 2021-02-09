
import { Alert, Button, Container } from 'react-bootstrap';
import { ErrorBoundary } from 'react-error-boundary';
import ftekLogo from '../img/ftek.svg';

const ErrorHandler = ({ children }) => {
  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return(
      <main>
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>
              Något gick fel!
            </Alert.Heading>
            <p>Något gick fel när sidan skulle laddas. Prova att besöka sidan igen om en liten stund.</p>
            <p>Har du fortsatta problem kan du <a href="https://ftek.se/support" target="_blank" rel="noreferrer">kontakta Spidera</a> med nedanstående information så hjälper vi dig.</p>
            <Button variant="lightgrey" onClick={resetErrorBoundary}>
              Ladda om
            </Button>
            <hr />
            <p><code>{`${error.name}: ${error.message}`}</code></p>
            <p><code>{error.stack}</code></p>
            <hr />
            <a href="https://ftek.se/" target="_blank" rel="noreferrer">
              <img
                src={ftekLogo}
                alt=""
                className="mr-3"
                width="60"
                height="60"
              />
            </a>
            <span>&copy; {new Date().getFullYear()} Fysikteknologsektionen</span>
          </Alert>    
        </Container>
      </main>
    );
  };

  return(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorHandler;