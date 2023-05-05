import { Controller, Inject, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/guards/jwtpassport.guard';
import { SubscriptionService } from './subscription.service';
import { User } from 'src/decorators/user.decorator';

@Controller('subscription')
export class SubscriptionController {
  @Inject(SubscriptionService)
  private readonly subscriptionService: SubscriptionService;

  @Put('/Pro')
  @UseGuards(JwtAuthGuard)
  public async subscriptionPro(@User() user) {
    await this.subscriptionService.Pro(user.id);
  }
  @Put('/Entreprise ')
  @UseGuards(JwtAuthGuard)
  public async subscriptionEntreprise(@User() user) {
    await this.subscriptionService.Entreprise(user.id);
  }
  @Put('/Free')
  @UseGuards(JwtAuthGuard)
  public async subscriptionFree(@User() user) {
    await this.subscriptionService.Free(user.id);
  }
}
