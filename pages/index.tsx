import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, InputGroup, Input, InputRightElement, Button, Link, useToast } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/next-js'

import axios from 'axios'
import login_image from '../public/images/login-image.webp'

export default function Home() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false);

	const router = useRouter()
	const toast = useToast();

	const login = () => {
		setLoading(true);

		const body = {
			email,
			password
		}

		// axios.post('https://note-api-4ya6.onrender.com/auth/login', body)
		axios.post('http://localhost:5400/auth/login', body)
			.then((response) => {
				console.log('response', response.data)
				if (response.data.token) {
					window.sessionStorage.setItem("token", response.data.token);
					setLoading(false);
					router.push('/dashboard')
					toast({
						title: `${response.data.message}`,
						status: 'success',
						isClosable: true,
					})
				}
			})
			.catch((error) => {
				setLoading(false);
				toast({
					title: `${error.response.data.message ? error.response.data.message : 'Erro na autenticação'}`,
					status: 'error',
					isClosable: true,
				})
			})
	}

	return (
		<>
			<Box p='36'>
				<Box display='flex' justifyContent='center' alignItems='center' gap='30' maxW='5xl' mx='auto'>
					<Box boxSize='md' display='flex' alignItems='center'>
						<Image src={login_image} alt='' />
					</Box>

					<Box w='360px' display='flex' flexDirection='column' gap='30'>
						<InputGroup size='md'>
							<Input placeholder='Email' type='text' bg='#EDECEC' size='md' value={email} required onChange={(e) => setEmail(e.target.value)} />
						</InputGroup>

						<InputGroup size='md'>
							<Input
								placeholder='Password'
								type={show ? 'text' : 'password'}
								bg='#EDECEC'
								size='md'
								value={password}
								required
								onChange={(e) => setPassword(e.target.value)} />
							<InputRightElement width='4.5rem'>
								<Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
									{show ? <ViewOffIcon /> : <ViewIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>


						<Box display='flex' justifyContent='space-between'>
							<Link>
								Esqueceu a senha?
							</Link>
							<Link>
								Cadastre-se
							</Link>
						</Box>
						<Button isLoading={loading} colorScheme='blue' size='lg' w='fit-content' onClick={login}>
							Login
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	)
}
