import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  useBreakpointValue,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { UserState, resetUser } from '../../store';
import { authApi } from '@utils/axios';

interface Links {
  name: string;
  path: string;
}

const HomeLinks: Links[] = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const AdminLinks: Links[] = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Users', path: '/admin/users' },
  { name: 'Projects', path: '/admin/projects' },
];

const UserLinks: Links[] = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Projects', path: '/user/projects' },
  { name: 'Tasks', path: '/user/tasks' },
];

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => {
    return state.user;
  });
  let NavLinks: Links[] = [];
  if (userInfo.id === 0) {
    NavLinks = HomeLinks;
  } else if (userInfo.role === 'admin') {
    NavLinks = AdminLinks;
  } else if (userInfo.role === 'manager' || userInfo.role === 'developer') {
    NavLinks = UserLinks;
  } else {
    NavLinks = HomeLinks;
  }

  async function onLogout() {
    await authApi.post('api/logout');
    localStorage.removeItem('token');
    dispatch(resetUser);
    document.location.href = '/signin';
  }

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.800')} px={4}>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Text
              textAlign={useBreakpointValue({
                base: 'center',
                md: 'left',
              })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {NavLinks.map((link) => NavLink(link))}
            </HStack>
          </HStack>

          {userInfo.id !== 0 ? UserOptions(onLogout, userInfo) : LoginOptions()}
        </Flex>
      </Box>
    </>
  );
}

const NavLink = (link: Links) => (
  <Link
    key={link.name}
    className="px-2 py-1 rounded-md hover:bg-gray-200 transition duration-500 ease-in-out"
    to={link.path}>
    {link.name}
  </Link>
);

const UserOptions = (onLogout: () => Promise<void>, userInfo?: UserState) => (
  <Flex alignItems={'center'}>
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}>
        <Avatar
          size={'sm'}
          name={userInfo?.id === 0 ? '' : userInfo?.firstName}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={onLogout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  </Flex>
);

const LoginOptions = () => (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify={'flex-end'}
    direction={'row'}
    spacing={6}>
    <Button
      as={'a'}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'pink.400'}
      href={'/signin'}
      _hover={{
        bg: 'pink.300',
      }}>
      Sign In
    </Button>
  </Stack>
);
