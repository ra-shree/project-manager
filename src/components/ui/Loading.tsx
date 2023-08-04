import { Flex, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Flex
      className="flex items-center justify-center"
      style={{ minHeight: '87vh' }}>
      <Spinner size="xl" />
    </Flex>
  );
}
