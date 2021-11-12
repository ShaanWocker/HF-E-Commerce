// import { Instagram, Facebook, WhatsApp } from "material-ui/icons";
import { Facebook, Instagram, WhatsApp } from "@material-ui/icons";
import styled from "styled-components";


const Container = styled.div`
    display: flex;
`;

const Left = styled.div`
    flex: 1;
    diplay: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1`

`;

const Desc = styled.p`

`;

const SocialContainer = styled.div`

`;

const SocialIcon = styled.div`

`;

const Center = styled.div`
    flex: 1;
`;

const Right = styled.div`
    flex: 1;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo></Logo>
                <Desc>I could say anything right over here</Desc>
                <SocialContainer>
                    <SocialIcon>
                        <Facebook/>
                    </SocialIcon>
                    <SocialIcon>
                        <Instagram/>
                    </SocialIcon>
                    <SocialIcon>
                        <WhatsApp/>
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center></Center>
            <Right></Right>
        </Container>
    );
};

export default Footer;
