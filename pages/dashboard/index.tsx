import Header from '@/src/components/Header'
import Footer from '@/src/components/Footer'
import { Box, Text, Button, Stack, InputGroup, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, IconButton } from '@chakra-ui/react'
import { AddIcon, EditIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import api from '@/src/services/api'
import { useRouter } from 'next/router'

export default function Dashboard() {

    const router = useRouter();
    const [notas, setNotas] = useState<any>(null);
    const [editar, setEditar] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    const readFromApi = async () => {
        const anotacoes: any = [];
        const token = window.sessionStorage.getItem("token");
        if (token) {
            const get_api = await api.get('/note/read')
            get_api.data.note.map((item: any) => {
                anotacoes.push(item);
            })
            setNotas(anotacoes);
        }
    }

    const alterarArray = (data: any, index: any) => {
        const pegaNotas = notas;

        pegaNotas[index].title = data;

        setNotas(...pegaNotas)
    }

    useEffect(() => {
        readFromApi();
    }, [router])

    return (
        <Box>
            <Header />
            <Stack>
                <Box display='flex' justifyContent='space-evenly' alignItems='center' my='30px'>
                    <Text fontSize='4xl'>Anotações</Text>
                    <Button colorScheme='teal' size='md' variant='outline' rightIcon={<AddIcon boxSize={3} />}>
                        New
                    </Button>
                </Box>
                <Box bg='#EDECEC' mb='35px' p='20px'>
                    <Accordion>
                        {notas?.length > 0 &&
                            notas?.map((item: any, index: any) => {
                                return (
                                    <AccordionItem key={index}>
                                        {({ isExpanded }) => (
                                            <>
                                                <h2>
                                                    <AccordionButton>
                                                        {editar ?
                                                            <Input type='text' placeholder={item.title} value={title} w='80%' onChange={(e) => alterarArray(e.target.value, index)} />
                                                            :
                                                            <Text color={'red'} w='80%' textAlign={'left'} px='20px'>{item.title}</Text>
                                                        }

                                                        <IconButton aria-label='Editar nota' icon={<EditIcon />} onClick={() => setEditar(!editar)} />
                                                        {isExpanded ? (
                                                            <ViewIcon fontSize='16px' ml={5} />
                                                        ) : (
                                                            <ViewOffIcon fontSize='16px' ml={5} />
                                                        )}
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                    aliquip ex ea commodo consequat.
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </Box>
            </Stack>
            <Footer />
        </Box>
    )
}
