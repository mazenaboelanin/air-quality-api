import cron from 'node-cron';
import { checkAirQualityJob } from './check-air-quality.job';

const jobs = [
  {
    name: 'Check Air Quality Job',
    job: checkAirQualityJob,
    schedule: '* * * * *'
  }
];

export function runScheduler() {
  jobs.forEach(({ schedule: cronExpression, job }) => {
    cron.schedule(cronExpression, async () => {
      try {
        console.log('==== Cron job is running every minute!', new Date().toISOString());
        await job();
      } catch (error) {
        console.log('==== CRON error', error)
        throw new (error.message);
      } finally {
        console.log('==== ENDED Cron job!', new Date().toISOString());
      }
    });
  });
}
