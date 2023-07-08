import { Box, Link, InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/next-js'

import logo from '../../public/images/logo.svg';
import userProfile from '../../public/images/user-profile.png'

function Header() {
    return (
        <Box w='100%' h='110px' display='flex' alignItems='center'>
            <Box w={[1280]} mx='auto' display='flex' justifyContent='space-around' alignItems='center'>
                <Link>
                    <Image src={logo} alt='' w='150px' h='auto' />
                </Link>
                <InputGroup w='md'>
                    <Input placeholder='Buscar por titulo' type='text' bg='#EDECEC' size='md' />
                    <InputRightElement>
                        <SearchIcon />
                    </InputRightElement>
                </InputGroup>
                <Box>
                    <Image src={userProfile} alt='' w='60px' h='auto' />
                </Box>
            </Box>
        </Box>
    )
}

export default Header