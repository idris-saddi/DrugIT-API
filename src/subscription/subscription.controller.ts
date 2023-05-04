import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { SubscriptionService } from './subscription.service';
import { User } from 'src/decorators/user.decorator';

@Controller('subscription')
export class SubscriptionController {
  @Inject(SubscriptionService)
  private readonly subscriptionService: SubscriptionService;

  @Post('/Pro')
  @UseGuards(JwtAuthGuard)
  public async subscriptionPro(@User() user) {
    await this.subscriptionService.Pro(user.id);
  }
  @Post('/Entreprise ')
  @UseGuards(JwtAuthGuard)
  public async subscriptionEntreprise(@User() user) {
    await this.subscriptionService.Entreprise(user.id);
  }
  @Post('/Free')
  @UseGuards(JwtAuthGuard)
  public async subscriptionFree(@User() user) {
    await this.subscriptionService.Free(user.id);
  }
}
