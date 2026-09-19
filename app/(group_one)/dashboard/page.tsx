
import { DashboardClients } from './DashboardClient'
export default async function Dashboard(){
  const rules = {
    today_appointment : {
      title : "Today's Appointments",
      category: 'today_appointment',
      saleStatus: 'set_up',
      noDataMessage: 'There are no appointments for today.'
    },
    follow_up : {
      title : 'Follow Up',
      category: 'follow_up',
      saleStatus: 'follow_up',
      noDataMessage: 'There are no follow up for today.'
    },
    pending_callback: {
      title : 'Pending For a Callback',
      category: 'pending_callback',
      saleStatus: 'pending_callback',
      noDataMessage: 'There are no callbacks for today.'
    },
    future_appointments:{
      title : 'Upcoming Appointments',
      category: 'upcoming',
      saleStatus: 'upcoming',
      noDataMessage: 'There are no Upcoming Appointments.'
    }
    // saleStatus: 'set_up' | 'pending_callback' | 'discarted' | 'sale_closed'

  }
  return <>

    <section className="columns-1 md:columns-2 lg:columns-3 gap-6 p-4">
      <h1 className="text-3xl font-bold">Welcome Back!</h1>
      <h4 className='text-text-gray'>{new Date().toLocaleDateString('en-US',{ month: 'long', day: '2-digit' })}</h4>
      <article className="break-inside-avoid mb-6 today_appointment">
        <DashboardClients rules={rules.today_appointment} />
      </article>
      <article className="break-inside-avoid mb-6 upcoming_appointments">
        <DashboardClients rules={rules.future_appointments} />
      </article>
      <article className="break-inside-avoid mb-6 follow_up">
        <DashboardClients rules={rules.follow_up} />
      </article>

      <article className="break-inside-avoid mb-6 pending_callback">
        <DashboardClients rules={rules.pending_callback} />
      </article>
      
    </section>
    {/* <Link href='/login'>Login</Link> */}
    {/* <ButtonSignOut /> */}
  </> 
}