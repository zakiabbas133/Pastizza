import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={`page ${styles.wrap}`}>
      <div className="container">
        <h1>404</h1>
        <p>This page does not exist — or the oven took it.</p>
        <Link to="/" className="btn btn-primary">
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
