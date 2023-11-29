import FCUserVerificationCode from '@/components/pages/users/FCUserVerificationCode'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import axios from 'axios'

type Props = {
  params: {
    activation_code: string
  }
}

export default async function VerificationPage({ params }: Props) {
  //
  let token = cookies().get('token')?.value
  if (token === undefined || token === null) {
    token = 'null'
    redirect('/')
  }
  // try {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm_verification_code`,
    { token: token, activation_code: params.activation_code },
  )
  console.log(data)
  if (data === 'success') {
    return <FCUserVerificationCode res={'success'} />
  } else if (data === 'already activated') {
    console.log('already activated')
    redirect('/')
  } else {
    return <FCUserVerificationCode res={'failed'} />
  }
  // } catch (error) {
  //     // console.log(error)
  //     console.log("failed")
  //     return <FCUserVerificationCode res={"failed"} />
  // }
}
