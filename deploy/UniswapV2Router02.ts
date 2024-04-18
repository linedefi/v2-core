import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/dist/types";
import config from "../constants/config";
const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId,
  ethers,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = parseInt(await getChainId());
  const WNATIVE_ADDRESS = config[chainId].WNATIVE_ADDRESS

  const factory = await ethers.getContract("UniswapV2Factory");

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factory.address, WNATIVE_ADDRESS],
    log: true,
    deterministicDeployment: false,
  });
};

func.tags = ["UniswapV2Router02", "AMM"];

func.dependencies = ["UniswapV2Factory", "WETH9"];

export default func;
