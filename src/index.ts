import '../config/env';  
import app from './app';
import { connectDB } from '../config/db';
import { runScheduler } from './jobs/scheduler';


const PORT = process.env.PORT || 5000;

// Connect to MongoDB first
connectDB();

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


runScheduler();