import {
  LinkProps,
  Link,
  Stack
} from "@chakra-ui/react"

const HoverLink = (props: LinkProps) => <Link rounded="base" _hover={{bg:"gray.200"}} p={2} {...props } />

const NavigationMenu = () => {
  return (
    <Stack as="nav">
      <HoverLink href="/burger">Burger</HoverLink>
      <HoverLink href="/sidemenu">Sidemenu</HoverLink>
      <HoverLink href="/drink">Drink</HoverLink>
      <HoverLink href="/takeout">Takeout</HoverLink>
    </Stack>
  )
}

export default NavigationMenu