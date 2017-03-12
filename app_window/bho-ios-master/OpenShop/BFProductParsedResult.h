//
//  BFProductParsedResult.h
//  OpenShop
//
//  Created by Jirka Apps
//  Copyright (c) 2015 Business Factory. All rights reserved.
//

#import "BFParsedResult.h"

NS_ASSUME_NONNULL_BEGIN

/**
 * `BFProductParsedResult` customizes `BFParsedResult` for product data model parsing.
 * This customization is required because of the Mantle library used for serialization which
 * caches data model properties. Therefore it is not possible to use a single `BFParsedResult`
 * class to parse multiple data models.
 */
@interface BFProductParsedResult : BFParsedResult



@end

NS_ASSUME_NONNULL_END
