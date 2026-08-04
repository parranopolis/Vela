
import { DashboardClients } from './DashboardClient'
import { NavBar } from '@/components/bar'
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
    }
    // saleStatus: 'set_up' | 'pending_callback' | 'discarted' | 'sale_closed'

  }
  return <>
    <NavBar/>
    <section className='grid '>
      <article className='today_appointment'>
        <DashboardClients rules={rules.today_appointment}/>
      </article>
      <article className='follow_up'>
        <DashboardClients rules={rules.follow_up}/>
      </article>
      <article className='pending_callback'>
        <DashboardClients rules={rules.pending_callback}/>
      </article>
    </section>
    {/* <Link href='/login'>Login</Link> */}
    {/* <ButtonSignOut /> */}
  </> 
}