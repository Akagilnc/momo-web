import { createCell } from 'web-cell';

import { Card } from '../component';

export default function PageEntry() {
    return (
        <main className="vh-100 d-flex flex-column align-items-center justify-content-around">
            <h1>I am a</h1>
            <Card
                className="w-75 text-center"
                title="Coach"
                link={{ path: 'coach/profile/edit' }}
                image={
                    <i className="fas fa-chalkboard-teacher fa-9x text-primary"></i>
                }
            />
            <Card
                className="w-75 text-center"
                title="Student"
                link={{ path: 'student', level: 'success' }}
                image={
                    <i className="fas fa-user-graduate fa-9x text-success"></i>
                }
            />
        </main>
    );
}
