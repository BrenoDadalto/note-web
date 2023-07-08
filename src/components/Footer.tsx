import { Box, Text, Link } from '@chakra-ui/react'

function Footer() {
    return (
        <Box w='100%' h='110px' display='flex' justifyContent='center' alignItems='center' bg='#EDECEC'>
            <Text>Desenvolvido por <Link href="https://brenodadalto.vercel.app/" color='purple.600' fontWeight='medium' isExternal>brenodadalto</Link>.</Text>
        </Box>
    )
}

export default Footer